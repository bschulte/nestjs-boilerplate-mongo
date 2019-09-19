import { Module } from '@nestjs/common';
import { TestModService } from './testMod.service';
import { TestModController } from './testMod.controller';
import { TestModResolver } from './testMod.resolver';
import { TestModSchema } from './testMod.schema';
import { TestModConsole } from './testMod.console';
// import { AuthModule } from 'src/auth/auth.module';
// import { RoleModule } from 'src/role/role.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TestMod', schema: TestModSchema }]),
    // RoleModule,
  ],
  controllers: [TestModController],
  providers: [TestModService, TestModResolver, TestModConsole],
  exports: [TestModService, TestModConsole],
})
export class TestModModule {}

