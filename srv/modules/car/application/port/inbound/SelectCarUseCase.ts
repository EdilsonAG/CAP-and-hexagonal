export interface SelectCarUseCase {
    findItemCar(id: string): Promise<Array<ItemCarrinho>>;
}