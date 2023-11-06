using API.DTOs;
using API.Entities;
 
namespace API.Interfaces;
 
public interface IUserRepository
{
    Task<MemberDTO> GetMemberAsync(string username);
    Task<IEnumerable<MemberDTO>> GetMembersAsync();
    Task<AppUser> GetUserByIdAsync(int id);
    Task<AppUser> GetUserByUsernameAsync(string username);
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<bool> SaveAllAsync();
    void Update(AppUser user);
    
}