import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { buildResponse } from 'src/common/utils/response.utils';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
  ) {}

  // CREATE ROLE
  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const isRoleExists = await this.rolesRepo.findOne({
        where: { name: createRoleDto.name },
      });

      if (isRoleExists) {
        return buildResponse(
          null,
          'Role already exists',
          HttpStatus.CONFLICT,
        );
      }

      const role = this.rolesRepo.create(createRoleDto);
      const savedRole = await this.rolesRepo.save(role);

      return buildResponse(
        savedRole,
        'Role created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      console.error('Error creating role:', error);

      return buildResponse(
        null,
        'Failed to create role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET ALL ROLES
  async getAllRoles() {
    try {
      const roles = await this.rolesRepo.find();

      if (roles.length === 0) {
        return buildResponse([], 'No roles found', HttpStatus.OK);
      }

      return buildResponse(
        roles,
        'Roles fetched successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      console.error('Error fetching roles:', error);

      return buildResponse(
        null,
        'Failed to fetch roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET SINGLE ROLE
  async getRolesByID(id: number) {
    try {
      const role = await this.rolesRepo.findOne({
        where: { id },
      });

      if (!role) {
        return buildResponse(
          null,
          'Role not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return buildResponse(
        role,
        'Role fetched successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      console.error('Error fetching role:', error);

      return buildResponse(
        null,
        'Failed to fetch role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // UPDATE ROLE
  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.rolesRepo.findOne({ where: { id } });

      if (!role) {
        return buildResponse(
          null,
          'Role not found',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.rolesRepo.update(id, updateRoleDto);

      const updatedRole = await this.rolesRepo.findOne({ where: { id } });

      return buildResponse(
        updatedRole,
        'Role updated successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      console.error('Error updating role:', error);

      return buildResponse(
        null,
        'Failed to update role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // DELETE ROLE (Soft delete via status)
 async deleteRole(id: number) {
  try {
    const role = await this.rolesRepo.findOne({ where: { id } });

    if (!role) {
      return buildResponse(
        null,
        'Role not found',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.rolesRepo.update(id, { status: 'inactive' } as any) as any;

    return buildResponse(
      null,
      'Role deleted successfully',
      HttpStatus.OK,
    );
  } catch (error) {
    console.error('Error deleting role:', error);

    return buildResponse(
      null,
      'Failed to delete role',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

}
