import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: "Leihoo 项目文档",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '主页', link: '/'},
            // {text: 'Examples', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: '公司简介',
                link: '/company_introduction/introduction.md'
            },
            {
                text: '智能产品',
                collapsed: true,
                items: smartProducts()
            },
            {
                text: '装备套件',
                collapsed: true,
                items: kits()
            },
            {
                text: '编程指南',
                collapsed: true,
                items: programmingGuide()
            },
            {
                text: '视频资源',
                collapsed: true,
                items: video()
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ],
        outline: {
            label: '页面导航',
            level:[2,3]
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
    },
    markdown: {
        image: {
            // 默认禁用图片懒加载
            lazyLoading: true
        }
    }
})

function smartProducts() {
    return [
        {text: 'LeKit V3X', link: '/smartProducts/LeKitV3X.md'},
        {text: 'Leight', link: '/smartProducts/Leight.md'},
    ]
}

function kits() {
    return [
        {text: 'LeKit-V3X系列物联网实验套件', link: '/kits/V3X_kits.md'},
    ]
}
function programmingGuide(){
    return [
        {
            text: 'Leight', collapsed: true, items: [
                {text: 'Leight 代码编程指南', link: '/programmingGuide/Leight/code.md'},
                {text: 'Leight 可视化编程指南', link: '/programmingGuide/Leight/blockly.md'},
            ]
        },
    ]
}
function video() {
    return [
        {
            text: 'LeKit-V3X 实验', collapsed: true, items: [
                {text: '电子标签我揭秘', link: '/video/LeKit-v3x-video/2-1.md'},
                {text: '巧用蓝牙做工具', link: '/video/LeKit-v3x-video/2-2.md'},
                {text: '互联协议仍沿用', link: '/video/LeKit-v3x-video/2-3.md'},
                {text: '物物互通有新径', link: '/video/LeKit-v3x-video/2-4.md'},

                {text: '刷卡开锁易实现', link: '/video/LeKit-v3x-video/3-1.md'},
                {text: '门铃通知即时到', link: '/video/LeKit-v3x-video/3-2.md'},
                {text: '远程控制更便捷', link: '/video/LeKit-v3x-video/3-3.md'},
                {text: '面容钥匙显智能', link: '/video/LeKit-v3x-video/3-4.md'},

                {text: '物联数据需采集', link: '/video/LeKit-v3x-video/4-1.md'},
                {text: '数据处理与分析', link: '/video/LeKit-v3x-video/4-2.md'},
                {text: '数据呈现可视化', link: '/video/LeKit-v3x-video/4-3.md'},
                {text: '反馈控制有算法', link: '/video/LeKit-v3x-video/4-4.md'},

                {text: '文物保护新手段 ', link: '/video/LeKit-v3x-video/5-1.md'},
                {text: '健康生活新设备', link: '/video/LeKit-v3x-video/5-2.md'},
                {text: '医疗设施新功能', link: '/video/LeKit-v3x-video/5-3.md'},
                {text: '农业生产新模式', link: '/video/LeKit-v3x-video/5-4.md'},
                {text: '学习探究新工具', link: '/video/LeKit-v3x-video/5-5.md'},

                {text: '数字世界有身份', link: '/video/LeKit-v3x-video/6-1.md'},
                {text: '安全防范讲策略', link: '/video/LeKit-v3x-video/6-3.md'},
                {text: '系统安全需升级', link: '/video/LeKit-v3x-video/6-2.md'},
                {text: '巧用数据加密传', link: '/video/LeKit-v3x-video/6-4.md'},
            ]
        },
    ]
}