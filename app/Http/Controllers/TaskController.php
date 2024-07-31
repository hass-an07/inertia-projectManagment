<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sort_field = request('sort_field', 'id');
        $sort_direction = request('sort_direction', 'asc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->with(['project', 'assignedUser', 'createdBy', 'updatedBy'])
            ->orderBy($sort_field, $sort_direction)
            ->paginate(10);

        return Inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query(),
            'success' => session('success')
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => ProjectResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        Task::create($data);

        return to_route('task.index')->with('success', 'Task created sucessfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => ProjectResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                $directory = dirname($task->image_path);
                Storage::disk('public')->deleteDirectory($directory);
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        $task->update($data);
        return to_route('task.index')->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;

        $task->delete();

        if ($task->image_path) {
            $directory = dirname($task->image_path);

            Storage::disk('public')->deleteDirectory($directory);
        }

        return to_route('task.index')->with('success', "Task '$name' deleted successfully");
    }

    public function myTasks(){
        $user = Auth::user();
        $query = Task::query()->where('assigned_user_id',$user->id);
        $sort_field = request('sort_field', 'id');
        $sort_direction = request('sort_direction', 'asc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->with(['project', 'assignedUser', 'createdBy', 'updatedBy'])
            ->orderBy($sort_field, $sort_direction)
            ->paginate(10);

        return Inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query(),
            'success' => session('success')
        ]);
    }
}
