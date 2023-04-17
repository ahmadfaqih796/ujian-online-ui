import { Buffer } from "buffer";

export class ConvertBase64 {
  constructor(value) {
    this.value = value;
  }

  encode() {
    if (typeof this.value !== "string") return "Value must be string!";
    const encode = Buffer.from(this.value).toString("base64");

    return encode;
  }
  decode() {
    if (typeof this.value !== "string") return "Value must be string!";
    const decode = Buffer.from(this.value, "base64").toString("ascii");
    return decode;
  }
}
