import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Hashids from 'hashids/cjs';

const hashids = new Hashids('ASDFGHjkloiu',8);

class Client extends Model {
  public id!: number;
  getEncodedId() {
    return hashids.encode(this.id);
  }
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Client.init(
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at"
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
  }
);

export { Client };