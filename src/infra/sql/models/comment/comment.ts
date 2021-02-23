import { Model } from 'sequelize';

class Comment extends Model {
  public id!: number; // The `null assertion` `!` is required in strict mode.
  public comment!: string;
  public commentId!: string;
  public articleId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Comment;
