import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const role = await roleRepository.findOne({
      where: { id: 1 },
    });

    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);  // Hashea la contraseña con bcrypt

    const users = repository.create([
      {
        email: 'admin@gmail.com',
        password: hashedPassword,  // Usa la contraseña hasheada
        role: role,
      },
    ]);
    await repository.save(users);
  }
}
