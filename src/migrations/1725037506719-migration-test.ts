import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest1725037506719 implements MigrationInterface {
    name = 'MigrationTest1725037506719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying(50) NOT NULL`);
    }

}
