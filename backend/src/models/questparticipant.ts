import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Hashids from 'hashids/cjs';
import { User } from './user';
import { Quest } from './quest';

const hashids = new Hashids('aswqsxcderf', 8);

class QuestParticipant extends Model {
  public id!: number;
  getEncodedId() {
    return hashids.encode(this.id);
  }
}

QuestParticipant.init(
  {
    encodedId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field: 'id',
      defaultValue: () => hashids.encode(Date.now()),
    },
    quest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Quest',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'QuestParticipant',
    tableName: 'quest_participants',
    timestamps: true,
  }
);

export { QuestParticipant };
