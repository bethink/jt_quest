
import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Hashids from 'hashids/cjs';
import { QuestParticipant } from './questparticipant';

const hashids = new Hashids('ASDFGHjkloiu',8);

class Quest extends Model {
  public id!: number;
  getEncodedId() {
    return hashids.encode(this.id);
  }
  public name!: string;
  public live!: boolean;
  public client_id!: number;
  public categories!: string[];
  public disable!: boolean;
  public points!: string;
  public points_token_ratio!: number;
  public network!: string;
  public token_symbol!: string;
  public primary_address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Quest.init(
  {
    encodedId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field:'id',
      defaultValue: () => hashids.encode(Date.now()), 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    live: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    disable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    points: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    points_token_ratio: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_symbol: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'Quest',
    tableName: 'quests',
    timestamps: true,
  }
);

export { Quest };
