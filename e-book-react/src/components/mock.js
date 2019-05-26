var book = [
    {
        book_id:0,
        title : '草房子',
        author :'曹文轩',
        isbn :9787552256963,
        remaining :100,
        price :20,
        introduction :'《草房子》是作家曹文轩创作的一部长篇小说。作品中讲述了男孩桑桑刻骨铭心，终身难忘的六年小学生活。这六年，是他接受人生启蒙教育的六年。',
    },{
        book_id:1,
        title : '软件测试进阶之路',
        author :'何飞',
        isbn :9787121338502,
        remaining :100,
        price :49,
        introduction :'10年软件测试管理经验，汇成 52 个问题，助你职场顺利进阶。基于问题驱动模式，根据具体应用场景构建解决问题所需的知识。',
    }
]

var buyingList = {
    total: 40,
    items: [
        {
            book_id: 0,
            amount : 2
        }
    ]
}

const mockData = [book,buyingList]

export default mockData;