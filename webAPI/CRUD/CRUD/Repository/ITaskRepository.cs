using Microsoft.AspNetCore.JsonPatch;

namespace CRUD.Repository
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Models.Task>> GetAllTasks();
        Task<Models.Task> GetTaskById(int id);
        Task<Models.Task> CreateTask(Models.Task task);
        Task Update(Models.Task task);
        Task PatchTask(int id, JsonPatchDocument patchDocument);
        Task Delete(int Id);
    }
}
