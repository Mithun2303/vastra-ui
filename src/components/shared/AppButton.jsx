import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AppButton({ className, children, ...props }) {
  return (
    <Button className={cn("rounded-full", className)} {...props}>
      {children}
    </Button>
  )
}
