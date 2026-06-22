import axios from "axios";

const API_BASE = "http://localhost:3001";
const REAL_API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

const realApi = axios.create({
  baseURL: REAL_API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Interceptor to add JWT token if exists for the real API
realApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Users / Auth ───────────────────────────────────────────

export async function loginUser(identifier, password) {
  try {
    const { data } = await realApi.post("/auth/login", { identifier, password });
    localStorage.setItem("jwt_token", data.token);
    localStorage.setItem("user_id", String(data.user_id));
    return data;
  } catch (err) {
    console.warn("Real backend login failed, falling back to mock json-server:", err.message);

    const { data: users } = await api.get("/users", {
      params: { email: identifier, password },
    });

    if (users.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = users[0];
    const token = `dev-token-${user.id}`;
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_id", String(user.id));

    // Determine onboarding completion by checking if brand profile exists
    const { data: brands } = await api.get("/brands", {
      params: { userId: Number(user.id) },
    });
    const onboarding_complete = brands.length > 0;

    return {
      user_id: user.id,
      token,
      onboarding_complete,
      redirect_to: onboarding_complete ? "/dashboard" : "/onboarding",
    };
  }
}

export async function registerUser({ name, mobile_number, email, password }) {
  try {
    const { data } = await realApi.post("/auth/register", {
      name,
      mobile_number,
      email,
      password,
    });
    localStorage.setItem("jwt_token", `dev-token-${data.user_id}`);
    localStorage.setItem("user_id", String(data.user_id));
    return data;
  } catch (err) {
    console.warn("Real backend registration failed, falling back to mock json-server:", err.message);

    const { data: existing } = await api.get("/users", {
      params: { email },
    });

    if (existing.length > 0) {
      throw new Error("Email already registered");
    }

    const { data: user } = await api.post("/users", {
      name,
      email,
      password,
      mobile_number,
    });

    const token = `dev-token-${user.id}`;
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_id", String(user.id));

    return {
      user_id: user.id,
      status: "registered",
      next_step: "/onboarding",
    };
  }
}

export function logoutUser() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user_id");
}

export function getCurrentUserId() {
  return localStorage.getItem("user_id");
}

// ─── Brands / Onboarding ────────────────────────────────────

export async function saveBrand({ brand_name, primary_city, avg_selling_price, categories, mobile_number, email }) {
  try {
    const { data } = await realApi.post("/onboarding/brand-details", {
      brand_name,
      primary_city,
      avg_selling_price,
      categories,
      mobile_number,
      email,
    });
    return data;
  } catch (err) {
    console.warn("Real backend onboarding failed, falling back to mock json-server:", err.message);

    const userId = getCurrentUserId() || "1";

    const { data: existing } = await api.get("/brands", {
      params: { userId: Number(userId) },
    });

    const brandData = {
      userId: Number(userId),
      brandName: brand_name,
      city: primary_city,
      asp: String(avg_selling_price),
      categories,
      mobile_number,
      email,
      createdAt: new Date().toISOString(),
    };

    if (existing.length > 0) {
      const { data } = await api.put(`/brands/${existing[0].id}`, brandData);
      return {
        brand_id: data.id,
        onboarding_status: "completed",
        redirect_to: "/dashboard",
      };
    } else {
      const { data } = await api.post("/brands", brandData);
      return {
        brand_id: data.id,
        onboarding_status: "completed",
        redirect_to: "/dashboard",
      };
    }
  }
}

export async function getBrand() {
  try {
    const { data: me } = await realApi.get("/auth/me");
    if (me && me.brand_id) {
      return {
        id: me.brand_id,
        brandName: me.brand_name,
        city: me.primary_city || "Tirupur",
        asp: me.avg_selling_price || 1299,
        categories: me.categories || [],
      };
    }
  } catch (err) {
    // Ignore real backend error, use fallback
  }

  const userId = getCurrentUserId() || "1";

  const { data: brands } = await api.get("/brands", {
    params: { userId: Number(userId) },
  });

  return brands.length > 0 ? brands[0] : null;
}

export async function getAllBrands() {
  const { data } = await api.get("/brands");
  return data;
}
