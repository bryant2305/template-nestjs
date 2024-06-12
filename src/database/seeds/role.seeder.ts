import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);

    const users = await roleRepository.create([
      {
        id: 1,
        name: 'Admin',
      },
    ]);
    await roleRepository.save(users);
  }
}
