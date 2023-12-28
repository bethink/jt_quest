// models/quest.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { Client } from './client';
import slugify from 'slugify';

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
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Quest.belongsTo(models.Client, {
      foreignKey: 'client_id',
      onDelete: 'CASCADE', // Adjust this based on your requirements
    });
  }
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
      references: {
        model: 'Client',
        key: 'id',
      },
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
