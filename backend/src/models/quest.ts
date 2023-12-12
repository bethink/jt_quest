// models/quest.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Quest extends Model {
  public id!: number;
  public name!: string;
  public live!: boolean;
  public client_id!: number;
  public slug!: string;
  public categories!: string[];
  public disable!: boolean;
  public points!: string;
  public points_token_ratio!: number;
  public network!: string;
  public token_symbol!: string;
  public primary_address!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Quest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    live: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    primary_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Quest',
    tableName: 'quests',
    timestamps: true, // Assuming you handle timestamps manually
  }
);

export { Quest };
