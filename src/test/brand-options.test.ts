import { describe, expect, it } from "vitest";
import { BUSINESS_TYPES } from "@/components/site/Distributor";
import { FACEBOOK_URL } from "@/lib/brand";

describe("Business contact choices", () => {
  it("accepts convenience stores", () => {
    expect(BUSINESS_TYPES).toContain("Tienda de Conveniencia");
  });
  it("accepts candy stores", () => {
    expect(BUSINESS_TYPES).toContain("Dulcería");
  });
  it("uses the official Facebook page", () => {
    expect(FACEBOOK_URL).toBe("https://www.facebook.com/people/Chokolo-Dulces-Snacks/61589474303030/");
  });
});