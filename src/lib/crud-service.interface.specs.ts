import { defaultPaginationParams, getPaginatedResponse, PaginatedResponse } from "./crud-service.interface";

interface TestItem {
  name: string;
  id: number;
}

describe("test getPaginatedResponse", () => {
  const items: TestItem[] = [];
  const maxItems = 102;

  for (let i = 1; i <= maxItems; i++) {
    items.push({
      id: i,
      name: `Test ${i}`
    });
  }

  it("should return correct default paging", () => {
    expect(defaultPaginationParams).toEqual({
      page: '1',
      limit: '20',
    })

    expect(getPaginatedResponse(items)).toEqual({
      items: items.slice(0, 20),
      totalItems: maxItems,
      page: 1,
      pageSize: 20,
      totalPages: 6
    } as PaginatedResponse<TestItem>);
  });

  it("should return correct paging for minimum limit", () => {
    const expected: PaginatedResponse<TestItem> = {
      items: items.slice(0, 1),
      totalItems: maxItems,
      page: 1,
      pageSize: 1,
      totalPages: 101
    };
    expect(getPaginatedResponse(items, 1, 1)).toEqual(expected);
    expect(getPaginatedResponse(items, 0, 1)).toEqual(expected);
  });

  it("should return correct paging for negative/0 inputs", () => {
    const expected: PaginatedResponse<TestItem> = {
      items: items.slice(0, +defaultPaginationParams.limit),
      totalItems: maxItems,
      page: 1,
      pageSize: 20,
      totalPages: 6
    };
    expect(getPaginatedResponse(items, 1, -10)).toEqual(expected);
    expect(getPaginatedResponse(items, -1, -20)).toEqual(expected);
    expect(getPaginatedResponse(items, -1, 0)).toEqual(expected);
    expect(getPaginatedResponse(items, 1, 0)).toEqual(expected);
  });

  it("should return correct paging for valid values", () => {
    const common: Partial<PaginatedResponse<TestItem>> = {
      totalItems: maxItems,
    };

    expect(getPaginatedResponse(items, 1, 10)).toEqual({
      items: items.slice(0, 10),
      page: 1,
      pageSize: 10,
      totalPages: 6,
      ...common
    } as PaginatedResponse<TestItem>);

    expect(getPaginatedResponse(items, 2, 10)).toEqual({
      items: items.slice(11, 21),
      page: 2,
      pageSize: 10,
      totalPages: 6,
      ...common
    } as PaginatedResponse<TestItem>);

    expect(getPaginatedResponse(items, 5, 10)).toEqual({
      items: items.slice(41, 51),
      page: 5,
      pageSize: 10,
      totalPages: 6,
      ...common
    } as PaginatedResponse<TestItem>);

    expect(getPaginatedResponse(items, 6, 10)).toEqual({
      items: [items[items.length - 1]],
      page: 6,
      pageSize: 10,
      totalPages: 6,
      ...common
    } as PaginatedResponse<TestItem>);
  });

  it("should return empty response when too big page is used", () => {
    const expected: PaginatedResponse<TestItem> = {
      items: [],
      totalItems: maxItems,
      page: 100,
      pageSize: 20,
      totalPages: 6
    };
    expect(getPaginatedResponse(items, 100)).toEqual(expected);
  });
});
