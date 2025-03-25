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
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const adminRole = await roleRepository.findOne({
      where: { id: 1 },
    });

    const hashedAdminPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD, // Hashea la contraseña con bcrypt
      10,
    );

    const users = userRepository.create([
      {
        email: process.env.ADMIN_EMAIL,
        password: hashedAdminPassword, // Usa la contraseña hasheada
        role: adminRole,
      },
    ]);
    await userRepository.save(users);
  }
}
