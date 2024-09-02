import { 
  http, 
  // HttpResponse, 
  passthrough 
} from "msw";

export const handlers = [
  http.get("*.ts", () => passthrough()),
  http.get("*.tsx", () => passthrough()),
  http.get("*.js", () => passthrough()),
  http.get("*.jsx", () => passthrough()),
  http.get("*.json", () => passthrough()),
  http.get("*.css", () => passthrough()),
  
] as const;
