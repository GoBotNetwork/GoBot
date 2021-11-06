import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "discord.js";

@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("int", { array: true })
  item: number[];

  @Column()
  balance: number;
}

export const getUser = async (user: User): Promise<GoUser | undefined> => {
  return await GoUser.findOne({ where: { id: user.id } });
};

export const createUser = async (user: User) => {
  let goUser = await getUser(user);
  if (goUser) {
    return goUser;
  }

  goUser = GoUser.create({
    id: user.id,
    balance: 0,
    item: [],
  });

  await goUser.save();
  return goUser;
};

export const upsert = async (user: User) => {
  const goUser = await getUser(user);
  if (goUser) {
    return goUser;
  } else {
    return await createUser(user);
  }
};

export const decrementBalance  = async (dcuser: User, amount: number) => {
  const user = await upsert(dcuser)
  let lost: number = 0
  if(amount>user.balance) {   //to prevent balance from going below 0

    lost = user.balance
    user.balance = 0

  } else {
    lost = amount
    user.balance = user.balance - amount
  }

  await user.save()
  return lost
}
