import { Model } from 'sequelize';

class Article extends Model {
  public id!: number; // The `null assertion` `!` is required in strict mode.
  public nickname!: string;
  public title!: string;
  public content!: Text;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Article;
