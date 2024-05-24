import { Aliment } from 'src/modules/aliment/entities/aliment.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class AlimentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('Objection status seeder');
    const repository = dataSource.getRepository(Aliment);

    const aliment = await repository.create([
      {
        name: 'Pechuga de pollo',
        description: 'pollo',
        calories_portion: 200,
        protein_portion: 22,
        carbos_portion: 15,
        fats_portion: 12,
      },
    ]);
    await repository.save(aliment);
  }
}
