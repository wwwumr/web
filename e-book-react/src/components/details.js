import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Navigation from './header';
import Tagger from './footer';

const {Content} = Layout;

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            userName:"user",
            book:[{
                title: '绝世唐门',
                author:"唐家三少",
                image:"/img/jueShiTangMen.jpg",
                ISBN:0,
                remaining:"10",
                intro:"《绝世唐门》是作者唐家三少全新力作的玄幻小说，又名《斗罗大陆Ⅱ绝世唐门》是斗罗系列的第二部！ 这里没有魔法，没有斗气，没有武术，却有武魂。唐门创立万年之后的斗罗大陆上，唐门式微。一代天骄横空出世，新一代史莱克七怪能否重振唐门，谱写一曲绝世唐门之歌？百万年魂兽，手握日月摘星辰的死灵圣法神，导致唐门衰落的全新魂导器体系。一切的神奇都将一一展现。 唐门暗器能否重振雄风，唐门能否重现辉煌，一切尽在绝世唐门！"
              },{
                title: '全职高手',
                author:"蝴蝶蓝",
                image:"/img/quanZhiGaoShou.jpg",
                ISBN:1,
                remaining:"10",
                intro:"网游荣耀中被誉为教科书级别的顶尖高手，因为种种原因遭到俱乐部的驱逐，离开职业圈的他寄身于一家网吧成了一个小小的网管。但是，拥有十年游戏经验的他，在荣耀新开的第十区重新投入了游戏。带着对往昔的回忆，和一把未完成的自制武器，开始了重返巅峰之路。"
              },{
                title: '三寸天堂',
                author:"耳根",
                image:"/img/sanCunTianTang.jpg",
                ISBN:2,
                remaining:"10",
                intro:"举头三尺无神明，掌心三寸是人间。这是耳根继《仙逆》《求魔》《我欲封天》《一念永恒》后，创作的第五部长篇小说《三寸人间》。 "
              },{
                title: '镇魂',
                author:"priest",
                image:"/img/zhenHun.jpg",
                ISBN:3,
                remaining:"10",
                intro:"如题，都市灵异故事温柔内敛美人攻VS暴躁精分……以及自以为攻的受。容易逆cp警报，请关注文案。作者：priest所写的《镇魂》无弹窗免费全文阅读为转载作品,章节由网友发布。推荐地址：https://www.qisuu.la/du/27/27861/"
              }
            ]
        }
    }
    render(){
        var bookDetail = this.state.book[this.state.id];
        return (
            <Layout>
            <Navigation />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}>
                <div>
                    <div id="header">
                        <h1>{ bookDetail.title }</h1>
                        <p>作  者：{bookDetail.author}</p>
                        <img src= {process.env.PUBLIC_URL+bookDetail.image} alt="" />
                    </div>
                    <div id="introduction">
                        <h2>书目简介</h2>
                        <br />
                        <p>{ bookDetail.intro }</p>
                        <hr />
                    </div>
                </div>
                </Content>
            </Layout>
            <Tagger />
            </Layout>
            
        );
    }
}

export default Details;

