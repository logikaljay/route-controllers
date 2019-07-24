import { Controller } from "../../"

@Controller("/test")
export default class BasicController {
  public async GetTest(): Promise<string> {
    return "";
  }

  public async CreateOrUpdateTest(): Promise<string> {
    return ""
  }
}