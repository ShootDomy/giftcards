import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { inicioSesionUsuario, registroUsuario } from './dto/usuario.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @Post('auth/registro')
  @ApiOkResponse()
  async registrarUsuario(@Body() usuario: registroUsuario) {
    return await this._usuarioService.registrarUsuario(usuario);
  }

  @Post('auth/inicio')
  @ApiOkResponse()
  async iniciarSesion(@Body() usuario: inicioSesionUsuario) {
    return await this._usuarioService.inicioSesionUsuario(usuario);
  }
}
