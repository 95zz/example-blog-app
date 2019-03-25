Blog.config({
  dateFormat: 'YYYY-MM-DD',
  shareit: {
    siteOrder: ['qq', 'wechat', 'webo'] // add Pinterest button
  },
  adminRole: 'blogAdmin',
  authorRole: 'blogAuthor',
  language: {
    blogEmpty: '这个博客看起来很空…',
    backToBlogIndex: '回到博客',
    loadMore: '加载更多',
    tags: '标签',
    slug: '标称',
    metaDescription: '描述标记',
    body: 'Body',
    showAsVisual: '视图',
    showAsHtml: '源码',
    save: '保存',
    cancel: '取消',
    "delete": '删除',
    metaAuthorBy: 'By',
    metaAuthorOn: 'on',
    edit: '编辑',
    areYouSure: '你确定吗？',
    disqusPoweredBy: '评论由',
    adminHeader: '博客管理员',
    addPost: '添加帖子',
    allPosts: '所有帖子',
    myPosts: '我的帖子',
    addPost: '新增博客',
    editPost: '编辑帖子',
    title: '标题',
    author: '作者',
    updatedAt: '更新时间',
    publishedAt: '发布时间',
    visibleTo: '是否可见',
    featuredImage: '特色图片',
    selectFile: '选择文件',
    imageAsBackground: '用作标题背景',
    enterTag: '输入标签并按Enter键',
    postCreateFirst: '创建第一个日志',
    postVisibilityAdmins: '仅限我和管理员',
    postVisibilityLink: '任何有链接的人',
    postVisibilityAnyone: '任何人都可见',
    saved: '保存',
    editFeaturedImageSaved: '已保存特色图像',
    editErrorSlugExists: '标称已存在',
    editErrorBodyRequired: '日志正文是必需的'
  }
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
      var userId;
      userId = Accounts.createUser({
          email: 'admin@admin.com',
          username: 'admin',
          password: 'admin',
          profile: {
              firstName: 'ADMIN',
              lastName: 'ADMIN'
          }
      });
      Roles.addUsersToRoles(userId, ['blogAdmin'], Roles.GLOBAL_GROUP);
    }else{
      Accounts.onCreateUser(function(options, user) {
        user["roles"] = ["blogAuthor"]
        Roles.addUsersToRoles(user._id, ['blogAuthor'], Roles.GLOBAL_GROUP);
        return user;
      })
    }
  });
}