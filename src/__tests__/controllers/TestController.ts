import { Controller } from "../../utils/attributes"

@Controller("/fuck")
export default class BasicController {
  public async GetTest(): Promise<string> {
    return "";
  }

  public async CreateOrUpdateTest(): Promise<string> {
    return ""
  }
}