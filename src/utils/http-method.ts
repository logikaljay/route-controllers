export const deduceMethodFromName = (name: string) => {
  name = name.toLowerCase()
  if (name.startsWith('get')) {
    return 'get'
  }
  else if (name.startsWith('create')) {
    return 'post'
  }
  else if (name.startsWith('update')) {
    return 'put'
  }
  else if (name.startsWith('delete')) {
    return 'delete'
  }
  else if (name.startsWith('remove')) {
    return 'delete'
  }
  
  return 'get'
}