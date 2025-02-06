import '../TelasClientesCss/Pedidos.css'; // Importando o CSS específico
import imagemPedido from '../../assets/lanche.jpg'; // Importe a imagem
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Pedidos() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="pedidos-container">
      <h1>Tela de Pedidos</h1>
      <div className="pedidos-lista">
        <ul>
          <li>Pedido 1 - R$ 59,90 - Status: Concluído</li>
          <li>Pedido 2 - R$ 39,90 - Status: Em andamento</li>
          <li>Pedido 3 - R$ 99,90 - Status: Concluído</li>
        </ul>
        <div className='teste-pedido' onClick={handleOpen}>
          <img src={imagemPedido} alt="Imagem do Pedido" />
          <div className='hamburguer'>
            Hamburguer
            <div className='descricao'>
              Delicioso hambúrguer com queijo, alface, tomate e pão.
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Pedidos;
