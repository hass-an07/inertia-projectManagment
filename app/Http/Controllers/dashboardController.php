<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class dashboardController extends Controller
{
    public function index(){
        $user = Auth::user();
        // for pending tasks
        $allPendingTasks = Task::query()->where('status','pending')->count();
        $myPendingTasks = Task::query()
        ->where('status','pending')
        ->where('assigned_user_id', $user->id)
        ->count();
        // for progress tasks
        $allInProgressTasks = Task::query()->where('status','in_progress')->count();
        $myInProgressTasks = Task::query()
        ->where('status','in_progress')
        ->where('assigned_user_id', $user->id)
        ->count();
        // for completed tasks
        $allCompletedTasks = Task::query()->where('status','completed')->count();
        $myCompletedTasks = Task::query()
        ->where('status','completed')
        ->where('assigned_user_id', $user->id)
        ->count();

        // my active  task
        $activeTasks = Task::query()->whereIn('status',['pending','in_progress'])->where('assigned_user_id',$user->id)->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks); 
        return inertia('Dashboard',compact('allPendingTasks','myPendingTasks','allInProgressTasks','myInProgressTasks','allCompletedTasks','myCompletedTasks','activeTasks'));
    }
}
