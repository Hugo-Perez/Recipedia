package com.hpc.backend.repository;

import com.hpc.backend.model.auth.ERole;
import com.hpc.backend.model.auth.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    public Optional<Role> findByName(ERole name);
}

