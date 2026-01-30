package com.cloudtask.userservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cloudtask.userservice.entity.Project;
import com.cloudtask.userservice.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // ========================================
    // EXISTING METHODS (your original methods)
    // ========================================
    
    /**
     * Find tasks by project, ordered by creation date descending
     */
    List<Task> findByProjectOrderByCreatedAtDesc(Project project);
    
    /**
     * Find tasks by project and status
     */
    List<Task> findByProjectAndStatus(Project project, String status);
    
    // ========================================
    // NEW: ASSIGNEE QUERY METHODS
    // ========================================
    
    /**
     * Find all tasks assigned to a specific user (across all projects)
     */
    List<Task> findByAssigneeUserId(String assigneeUserId);
    
    /**
     * Find tasks assigned to user, ordered by creation date
     */
    List<Task> findByAssigneeUserIdOrderByCreatedAtDesc(String assigneeUserId);
    
    /**
     * Find tasks by project and assignee (using Project entity)
     */
    List<Task> findByProjectAndAssigneeUserId(Project project, String assigneeUserId);
    
    /**
     * Find tasks by project ID and assignee (using Long projectId)
     */
    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND t.assigneeUserId = :assigneeUserId")
    List<Task> findByProjectIdAndAssigneeUserId(@Param("projectId") Long projectId, @Param("assigneeUserId") String assigneeUserId);
    
    /**
     * Find tasks by assignee and status
     */
    List<Task> findByAssigneeUserIdAndStatus(String assigneeUserId, String status);
    
    /**
     * Find unassigned tasks in a project (using Project entity)
     */
    @Query("SELECT t FROM Task t WHERE t.project = :project AND t.assigneeUserId IS NULL ORDER BY t.createdAt DESC")
    List<Task> findUnassignedTasksByProject(@Param("project") Project project);
    
    /**
     * Find unassigned tasks in a project (using projectId)
     */
    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND t.assigneeUserId IS NULL ORDER BY t.createdAt DESC")
    List<Task> findUnassignedTasksByProjectId(@Param("projectId") Long projectId);
    
    /**
     * Find unassigned tasks by project and status
     */
    @Query("SELECT t FROM Task t WHERE t.project = :project AND t.assigneeUserId IS NULL AND t.status = :status")
    List<Task> findUnassignedTasksByProjectAndStatus(@Param("project") Project project, @Param("status") String status);
    
    /**
     * Find all assigned tasks in a project (has assignee)
     */
    @Query("SELECT t FROM Task t WHERE t.project = :project AND t.assigneeUserId IS NOT NULL ORDER BY t.createdAt DESC")
    List<Task> findAssignedTasksByProject(@Param("project") Project project);
    
    /**
     * Count total assigned tasks for a user in a project
     */
    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId AND t.assigneeUserId = :userId")
    Long countAssignedTasks(@Param("projectId") Long projectId, @Param("userId") String userId);
    
    /**
     * Count assigned tasks by status for a user
     */
    @Query("SELECT COUNT(t) FROM Task t WHERE t.assigneeUserId = :userId AND t.status = :status")
    Long countAssignedTasksByStatus(@Param("userId") String userId, @Param("status") String status);
    
    /**
     * Count assigned tasks by status in a specific project
     */
    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId AND t.assigneeUserId = :userId AND t.status = :status")
    Long countAssignedTasksByProjectAndStatus(@Param("projectId") Long projectId, @Param("userId") String userId, @Param("status") String status);
    
    /**
     * Check if a user has any assigned tasks in a project
     */
    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Task t WHERE t.project.id = :projectId AND t.assigneeUserId = :userId")
    boolean hasAssignedTasks(@Param("projectId") Long projectId, @Param("userId") String userId);
    
    /**
     * Find tasks assigned by a specific user
     */
    List<Task> findByAssignedBy(String assignedBy);
    
    /**
     * Find tasks by project, ordered by assigned date
     */
    @Query("SELECT t FROM Task t WHERE t.project = :project AND t.assigneeUserId IS NOT NULL ORDER BY t.assignedAt DESC")
    List<Task> findByProjectOrderByAssignedAtDesc(@Param("project") Project project);
}