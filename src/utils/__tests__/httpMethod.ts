import { setHttpMethodNameMapper } from "../../"
import { deduceMethodFromName } from '../httpMethod'

const originalDeducer = deduceMethodFromName

describe("setHttpMethodMapper", () => {
  afterEach(() => {
    setHttpMethodNameMapper(originalDeducer)
  })

  it("should set a new http method mapper", () => {
    const mockMapper = jest.fn().mockImplementation((name) => "test")
    setHttpMethodNameMapper(mockMapper)
    expect(deduceMethodFromName).toBe(mockMapper)
  })
})

describe("deduceMethodFromName", () => {
  it("should map a get method name correctly", () => {
    expect(deduceMethodFromName("GetTest")).toBe("get")
  })
  it("should map a post method name correctly", () => {
    expect(deduceMethodFromName("CreateOrUpdateTest")).toBe("post")
  })
  it("should map a delete method name correctly", () => {
    expect(deduceMethodFromName("DeleteTest")).toBe("delete")
    expect(deduceMethodFromName("RemoveTest")).toBe("delete")
  })
  it("should map a put method name correctly", () => {
    expect(deduceMethodFromName("UpdateTest")).toBe("put")
  })
})