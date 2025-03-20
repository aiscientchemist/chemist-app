def deposit()
    while True:
        amount = float(input("Enter the amount to deposit: $"))
        if amount.isdigit():
            amount = int(amount)
            if amount > 0:
                break
            else:
                print("give some money")
            
                return amount
              

def main():
      balance = deposit()
 main 
