using CRUD.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

 namespace CRUD.Repository
{
    public class TaskRepository : ITaskRepository
    {
        public readonly DatabaseContext _context;
        public TaskRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Models.Task> CreateTask(Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        public async System.Threading.Tasks.Task Delete(int Id)
        {
            var taskToDelete = await _context.Tasks.FindAsync(Id);
            _context.Tasks.Remove(taskToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Models.Task>> GetAllTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<Models.Task> GetTaskById(int Id)
        {
            return await _context.Tasks.FindAsync(Id);
        }

        public async System.Threading.Tasks.Task Update(Models.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task PatchTask(int id, JsonPatchDocument patchDocument)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task !=  null)
            {
                patchDocument.ApplyTo(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}
