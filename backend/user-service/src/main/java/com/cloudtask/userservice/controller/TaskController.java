package com.cloudtask.userservice.controller;

import com.cloudtask.userservice.dto.TaskRequest;
import com.cloudtask.userservice.entity.Task;
import com.cloudtask.userservice.service.ProjectMemberService;
import com.cloudtask.userservice.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;
    private final ProjectMemberService projectMemberService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Task API is working! 🚀");
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @RequestBody TaskRequest request,
            @RequestParam String firebaseUid
    ) {
        // Check if user has access to the project
        if (!projectMemberService.hasAccess(request.getProjectId(), firebaseUid)) {
            return ResponseEntity.status(403).build();
        }

        Task task = taskService.createTask(
                request.getTitle(),
                request.getDescription(),
                request.getProjectId()
        );
        return ResponseEntity.ok(task);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getProjectTasks(
            @PathVariable Long projectId,
            @RequestParam String firebaseUid
    ) {
        // Check if user has access to the project
        if (!projectMemberService.hasAccess(projectId, firebaseUid)) {
            return ResponseEntity.status(403).build();
        }

        List<Task> tasks = taskService.getProjectTasks(projectId);
        return ResponseEntity.ok(tasks);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam String firebaseUid
    ) {
        // TODO: Add more granular permission checks (only assigned user or admin can update)
        Task task = taskService.updateTaskStatus(id, status);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            @RequestParam String firebaseUid
    ) {
        // TODO: Check if user is admin/owner before deleting
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}