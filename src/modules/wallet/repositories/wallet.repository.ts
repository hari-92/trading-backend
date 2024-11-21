import { Wallet } from '../entities/wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';

export class WalletRepository extends Repository<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {
    super(
      walletRepository.target,
      walletRepository.manager,
      walletRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Wallet[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Wallet | null> {
    return this.findOneBy({ id: id });
  }

  public async store(wallet: CreateWalletDto): Promise<Wallet> {
    const newWallet = this.create(wallet);
    return this.save(newWallet);
  }

  public async updateOne(
    id: number,
    updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet | undefined> {
    const wallet = await this.findById(id);
    if (!wallet) {
      return undefined;
    }
    Object.assign(wallet, updateWalletDto);
    return this.save(wallet);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}
