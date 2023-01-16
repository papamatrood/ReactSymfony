<?php

namespace App\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RapportRepository;
use ApiPlatform\Core\Annotation\ApiResource;

#[ORM\Entity(repositoryClass: RapportRepository::class)]
#[ApiResource()]
class Rapport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $installation = null;

    #[ORM\Column]
    private ?int $interqualite = null;

    #[ORM\Column]
    private ?int $interdepannage = null;

    #[ORM\Column]
    private ?int $visite = null;

    #[ORM\Column]
    private ?int $recuperation = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $autre = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;


    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInstallation(): ?int
    {
        return $this->installation;
    }

    public function setInstallation(int $installation): self
    {
        $this->installation = $installation;

        return $this;
    }

    public function getInterqualite(): ?int
    {
        return $this->interqualite;
    }

    public function setInterqualite(int $interqualite): self
    {
        $this->interqualite = $interqualite;

        return $this;
    }

    public function getInterdepannage(): ?int
    {
        return $this->interdepannage;
    }

    public function setInterdepannage(int $interdepannage): self
    {
        $this->interdepannage = $interdepannage;

        return $this;
    }

    public function getVisite(): ?int
    {
        return $this->visite;
    }

    public function setVisite(int $visite): self
    {
        $this->visite = $visite;

        return $this;
    }

    public function getRecuperation(): ?int
    {
        return $this->recuperation;
    }

    public function setRecuperation(int $recuperation): self
    {
        $this->recuperation = $recuperation;

        return $this;
    }

    public function getAutre(): ?string
    {
        return $this->autre;
    }

    public function setAutre(?string $autre): self
    {
        $this->autre = $autre;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
