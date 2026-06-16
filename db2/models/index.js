import User from '../feature/user/user.models.js';
import Post from '../feature/post/post.model.js';

User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});