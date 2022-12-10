export function intact_path(to, from) {
    if (!to.query.cate) {
        return {
            path: to.path,
            query: {
                cate: '全部'
            }
        }
    }
}