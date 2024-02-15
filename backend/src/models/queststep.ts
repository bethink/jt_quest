import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Hashids from 'hashids/cjs';
import { Quest } from './quest';

const hashids = new Hashids();

interface QuestStepAttributes {
  id: number;
  questId: number;
  category: string;
  subCategory: string;
  args: any[];
  instruction: string;
  createdAt: Date;
  updatedAt: Date;
}

class QuestStep extends Model<QuestStepAttributes> implements QuestStepAttributes {
  id!: number;
  questId!: number;
  category!: string;
  subCategory!: string;
  args!: any[];
  instruction!: string;
  createdAt!: Date;
  updatedAt!: Date;

  getEncodedId() {
    return hashids.encode(this.id);
  }

  static associate(models: any) {
    QuestStep.belongsTo(models.Quest, {
      foreignKey: 'quest_id',
      onDelete: 'CASCADE',
    });
  }
}

QuestStep.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field: 'id',
      defaultValue: () => hashids.encode(Date.now()),
    },
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quest,
        key: 'id',
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    args: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'QuestStep',
    tableName: 'quest_steps',
    timestamps: true,
  }
);

export { QuestStep };