delete from book;
delete from user;
delete from orders;
delete from order_item;


insert into book values(0,'草房子','曹文轩',9787552256963,100,20,'《草房子》是作家曹文轩创作的一部长篇小说。作品中讲述了男孩桑桑刻骨铭心，终身难忘的六年小学生活。这六年，是他接受人生启蒙教育的六年。');
insert into book values(1,'软件测试进阶之路','何飞',9787121338502,100,49,'10年软件测试管理经验，汇成 52 个问题，助你职场顺利进阶。基于问题驱动模式，根据具体应用场景构建解决问题所需的知识。');
insert into book values(2,'计算机文化(原书第15版)','June Jamrich Parsons',9787111465409,100,79,'《计算机文化（英文版·第13版）》采用最先进的方法和技术讲述计算机基础知识，涉及面之广、内容之丰富、方法之独特，令人叹为观止，堪称计算机基础知识的百科全书。');
insert into book values(3,'Java设计模式','耿祥义,张跃平',9787302198048,100,29,'《Java设计模式》为21世纪高等学校计算机专业实用规划教材之一。');
insert into book values(4,'一本书弄懂风水','郑同',9787801787255,100,38,'《一本书弄懂风水》用浅显的语言配合500余幅图片，把原本深奥复杂的风水理论变得简单而生动，使读者一目了然，全面掌握风水知识，轻松地弄懂风水这门神秘的学问。');
insert into book values(5,'追风筝的人','卡勒德.胡赛尼',9787208061644,100,34.2,'《追风筝的人》是美籍阿富汗作家卡勒德·胡赛尼（Khaled Hosseini）的第一部长篇小说，译者李继宏，是美国2005年的排名第三的畅销书。全书围绕风筝与阿富汗的两个少年之间展开，一个富家少年与家中仆人关于风筝的故事，关于人性的背叛与救赎。');


insert into user values(0,'admin','password','ADMIN',null,'example.qq.com');
insert into user values(1,'user','password','USER',null,'example.qq.com');

insert into orders values(0,'user','2019-05-01-11:23:05',69);

insert into order_item values(0,0,1);
insert into order_item values(0,1,1);

