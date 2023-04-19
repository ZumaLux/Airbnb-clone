export { default } from "next-auth/middleware";

// makes the following routes protected
export const config = {
  matcher: ["/trips", "/reservation", "/properties", "/favorites"],
};
