export default class GameServer {
  constructor(
    id,
    user_id,
    display_name,
    ip_string,
    port,
    rcon_password,
    in_use,
    public_server
  ) {
    this.id = id,
    this.user_id = user_id,
    this.display_name = display_name,
    this.ip_string = ip_string,
    this.port = port,
    this.rcon_password = rcon_password,
    this.in_use = in_use,
    this.public_server = public_server;
  }
}