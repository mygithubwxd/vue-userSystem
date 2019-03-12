// 用户信息 users
// 公司信息 companies

输入URL信息获取或者操作数据库db.json中的数据（发送不同的请求方法，实现数据的增删改查 自动生成id）

// 获取所有用户信息
http://localhost:3000/users

// 获取 id 为 1 的用户信息
http://localhost:3000/users/1

// 获取公司的所有信息
http://localhost:3000/companies

// 获取单个公司的信息
http://localhost:3000/companies/1

// 获取所有公司 id(companyId)为 3 的用户
http://localhost:3000/companies/3/users

// 根据公司名字获取信息
http://localhost:3000/companies?name=Microsoft

// 根据多个名字获取公司信息
http://localhost:3000/companies?name=Microsoft&name=Apple

// 获取一页中只有两条数据
http://localhost:3000/companies?_page=1&_limit=2

// 对数据进行排序 asc 升序 desc 降序
http://localhost:3000/companies?_sort=name&_order=asc

// 获取年龄 30 及以上的用户
http://localhost:3000/users?age_gte=30

// 获取年龄在 30 到 40 之间的用户
http://localhost:3000/users?age_gte=30&age_lte=40

// 搜索用户信息，根据输入的搜索信息（h）搜索，全文搜索
http://localhost:3000/users?q=h
