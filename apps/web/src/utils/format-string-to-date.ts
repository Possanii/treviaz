interface IFormatData<TData> {
  data: TData[]
  fields: (keyof TData)[]
}

export function formatStringToDate<TData>({
  data,
  fields,
}: IFormatData<TData>): TData[] {
  return data.map((item) => {
    const newItem = { ...item }

    fields.forEach((field) => {
      const value = item[field]

      if (typeof value === 'string') {
        // TODO: validate if the field is really a date
        newItem[field] = new Date(value)
      }
    })

    return newItem
  })
}
