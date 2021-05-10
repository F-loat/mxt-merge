import type { File } from '../types'

interface Result {
  name: string;
  title?: string[];
  data: any[];
}

export const merge: (files: File[]) => any = (files) => {
  return files
    .reduce((result: Result[], current) => {
      current.source
        .split('\r\n')
        .reduce((_rst: any[], cur: string) => {
          if (cur.match(/^柱子名称.*/)) {
            result.push({
              name: cur.split('\t')[1],
              title: [],
              data: []
            })
          } else if (cur.match(/^峰.*/)) {
            result[result.length - 1].title = cur.split('\t').map(i => i.trim())
          } else {
            result[result.length - 1].data.push(cur.split('\t').reduce((r, c, i) => {
              const { title } = result[result.length - 1]
              if (!title) return r
              return { ...r, [title[i]]: c }
            }, {}))
          }
          return result
        }, [])
        return result
    }, [])
    .reduce((result: Result[][], current) => {
      current.data.forEach(item => {
        const group = parseInt(item['保留时间'])
        const groupItem = {
          name: current.name,
          data: item
        }
        if (result[group]) {
          result[group].push(groupItem)
        } else {
          result[group] = [groupItem]
        }
      })
      return result
    }, [])
    .filter(Boolean)
}