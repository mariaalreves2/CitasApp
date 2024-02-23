using System.Text;
using API.Data;
using API.Entities;
using System.Security.Cryptography; //[HttpPost("register")]
using Microsoft.AspNetCore.Mvc;
using API.DTOs;//[HttpPost("register")]
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    private const string USER_PASSWORD_ERROR_MESSAGE = "Usuario o contraseña incorrectos";

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
    {
        if(await UserExists(registerDTO.Username)) 
            return BadRequest("Ya existe nombre de usuario");
        using var hmac = new HMACSHA512();//creamos variable porque se usará más de una vez
        var user = new AppUser
        {
            UserName = registerDTO.Username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto{
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(x =>
        x.UserName.ToLower() == loginDto.Username.ToLower());

        if(user == null) return Unauthorized(USER_PASSWORD_ERROR_MESSAGE);

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for(int i = 0; i < computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized(USER_PASSWORD_ERROR_MESSAGE);

        }

        return new UserDto{
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };

    }

    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
    }
}
