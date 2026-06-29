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

// ─── LocalStorage DB Helper Functions ─────────────────────────

function getLocalUsers() {
  const users = localStorage.getItem("mock_users");
  if (!users) {
    const defaultUsers = [
      {
        id: "1",
        name: "Demo User",
        email: "demo@vastra.in",
        password: "demo123"
      }
    ];
    localStorage.setItem("mock_users", JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(users);
  } catch (e) {
    return [];
  }
}

function saveLocalUsers(users) {
  localStorage.setItem("mock_users", JSON.stringify(users));
}

function getLocalBrands() {
  const brands = localStorage.getItem("mock_brands");
  if (!brands) {
    const defaultBrands = [
      {
        userId: 1,
        brandName: "qwerty",
        city: "Coimbatore",
        asp: "800",
        categories: [
          "Salwar Sets",
          "Occasion Wear",
          "Dupattas"
        ],
        createdAt: "2026-06-21T17:24:19.081Z",
        id: "1"
      }
    ];
    localStorage.setItem("mock_brands", JSON.stringify(defaultBrands));
    return defaultBrands;
  }
  try {
    return JSON.parse(brands);
  } catch (e) {
    return [];
  }
}

function saveLocalBrands(brands) {
  localStorage.setItem("mock_brands", JSON.stringify(brands));
}

// ─── Users / Auth ───────────────────────────────────────────

export async function loginUser(identifier, password) {
  try {
    const { data } = await realApi.post("/auth/login", { identifier, password });
    localStorage.setItem("jwt_token", data.token);
    localStorage.setItem("user_id", String(data.user_id));
    return data;
  } catch (err) {
    console.warn("Real backend login failed, falling back to mock json-server:", err.message);

    try {
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
    } catch (mockErr) {
      console.warn("Mock json-server failed, falling back to client-side storage:", mockErr.message);

      const users = getLocalUsers();
      const user = users.find(u => (u.email === identifier || String(u.id) === String(identifier)) && u.password === password);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const token = `dev-token-${user.id}`;
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user_id", String(user.id));

      const brands = getLocalBrands();
      const userBrands = brands.filter(b => Number(b.userId) === Number(user.id));
      const onboarding_complete = userBrands.length > 0;

      return {
        user_id: user.id,
        token,
        onboarding_complete,
        redirect_to: onboarding_complete ? "/dashboard" : "/onboarding",
      };
    }
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

    try {
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
    } catch (mockErr) {
      console.warn("Mock json-server failed, falling back to client-side storage:", mockErr.message);

      const users = getLocalUsers();
      const existing = users.find(u => u.email === email);
      if (existing) {
        throw new Error("Email already registered");
      }

      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password,
        mobile_number
      };
      users.push(newUser);
      saveLocalUsers(users);

      const token = `dev-token-${newUser.id}`;
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user_id", String(newUser.id));

      return {
        user_id: newUser.id,
        status: "registered",
        next_step: "/onboarding",
      };
    }
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

    try {
      const { data: existing } = await api.get("/brands", {
        params: { userId: Number(userId) },
      });

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
    } catch (mockErr) {
      console.warn("Mock json-server failed, falling back to client-side storage:", mockErr.message);

      const brands = getLocalBrands();
      const existingIdx = brands.findIndex(b => Number(b.userId) === Number(userId));

      if (existingIdx > -1) {
        const updatedBrand = {
          ...brands[existingIdx],
          ...brandData
        };
        brands[existingIdx] = updatedBrand;
        saveLocalBrands(brands);
        return {
          brand_id: updatedBrand.id,
          onboarding_status: "completed",
          redirect_to: "/dashboard",
        };
      } else {
        const newBrand = {
          ...brandData,
          id: String(brands.length + 1)
        };
        brands.push(newBrand);
        saveLocalBrands(brands);
        return {
          brand_id: newBrand.id,
          onboarding_status: "completed",
          redirect_to: "/dashboard",
        };
      }
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

  try {
    const { data: brands } = await api.get("/brands", {
      params: { userId: Number(userId) },
    });

    return brands.length > 0 ? brands[0] : null;
  } catch (mockErr) {
    console.warn("Mock json-server failed, falling back to client-side storage:", mockErr.message);

    const brands = getLocalBrands();
    const userBrands = brands.filter(b => Number(b.userId) === Number(userId));
    return userBrands.length > 0 ? userBrands[0] : null;
  }
}

export async function getAllBrands() {
  try {
    const { data } = await api.get("/brands");
    return data;
  } catch (mockErr) {
    console.warn("Mock json-server failed, falling back to client-side storage:", mockErr.message);
    return getLocalBrands();
  }
}
