<?php

namespace App\Repository;

use App\Entity\CharacteristicProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CharacteristicProduct>
 *
 * @method CharacteristicProduct|null find($id, $lockMode = null, $lockVersion = null)
 * @method CharacteristicProduct|null findOneBy(array $criteria, array $orderBy = null)
 * @method CharacteristicProduct[]    findAll()
 * @method CharacteristicProduct[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CharacteristicProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CharacteristicProduct::class);
    }

    public function save(CharacteristicProduct $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CharacteristicProduct $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return CharacteristicProduct[] Returns an array of CharacteristicProduct objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CharacteristicProduct
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
